const PersonalInformation = require('../models/personalInformationSchema');
const _ = require('lodash');

const visas = {1:'submit onboarding application and receipt',2:'ead',3:'i983',4:'i20'}; // mapping type number with visa
// const approalStatus = {0:'new',1:'approved',2:'submitted',3:'rejected'};

exports.getAllProfiles = async () => {
    const documents = await PersonalInformation.aggregate([
        {
            $lookup: {
                from: 'workinformations', 
                localField: 'userId',
                foreignField: 'userId',
                as: 'dataB'
            }
        },
        {
            $lookup: {
                from: 'documents', 
                let: {userObjId: {$toObjectId: '$userId'}},
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $eq:['$employee', '$$userObjId']
                            }
                        }
                    }
                ],
                as: 'dataC'
            }
        },
        {
            $unwind: { path: '$dataB', preserveNullAndEmptyArrays: true }
        },
        {
            $unwind: { path: '$dataC', preserveNullAndEmptyArrays: true }
        },
        {
            $lookup: {
                from: 'files',
                localField: 'dataC.receipt.link',
                foreignField: '_id',
                as: 'receiptLink'
            }
        },
        {
            $lookup: {
                from: 'files',
                localField: 'dataC.ead.link',
                foreignField: '_id',
                as: 'eadLink'
            }
        },
        {
            $lookup: {
                from: 'files',
                localField: 'dataC.i983.link',
                foreignField: '_id',
                as: 'i983Link'
            }
        },
        {
            $lookup: {
                from: 'files',
                localField: 'dataC.i20.link',
                foreignField: '_id',
                as: 'i20Link'
            }
        },
        {
            $project: {
                userId: 1,
                name: {firstName: '$firstName', lastName: '$lastName',preferredName: '$preferredName'},
                ssn: '$dataB.ssn',
                email: '$email',
                employment: {
                    workAuthorization: '$dataB.workAuthorization',
                    startDate: '$dataB.startDate',
                    endDate: '$dataB.endDate',
                    
                    remainingdays: {
                        $round: [
                            {
                              $divide: [
                                {
                                  $abs: {
                                    $subtract: [
                                      { $toDate: '$dataB.endDate' }, 
                                      new Date() 
                                    ]
                                  }
                                },
                                24 * 60 * 60 * 1000 // Convert milliseconds to days
                              ]
                            },
                            2 // Specify the number of decimal places
                          ]
                        }
                },
                document:{
                    receipt:{
                        link: {$ifNull: ['$receiptLink', null]},
                        status: {
                            $ifNull:['$dataC.receipt.status',0]
                        }
                    },
                    ead:{
                        link: {$ifNull: ['$eadLink', null]},
                        status: {
                            $ifNull:['$dataC.ead.status',0]
                        }
                    },
                    i983:{
                        link: {$ifNull: ['$i983Link', null]},
                        status: {
                            $ifNull:['$dataC.i983.status',0]
                        }
                    },
                    i20:{
                        link: {$ifNull: ['$i20Link', null]},
                        status: {
                            $ifNull:['$dataC.i20.status',0]
                        }
                    }
                },
                nextStep: {
                    $ifNull:['$dataC.nextStep',1]
                }
            }
        }
    ]);
    if(!documents) return {};
    return documents;
}