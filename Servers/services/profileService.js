const PersonalInformation = require('../models/personalInformationSchema');
const _ = require('lodash');

const visas = {1:'receipt',2:'ead',3:'i983',4:'i20'}; // mapping type number with visa
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
            $project: {
                userId: 1,
                name: {firsName: '$firstName', lastName: '$lastName'},
                ssn: '$dataB.ssn',
                employment: {
                    workAuthorization: '$dataB.workAuthorization',
                    startDate: '$dataB.startDate',
                    endDate: '$dataB.endDate'
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