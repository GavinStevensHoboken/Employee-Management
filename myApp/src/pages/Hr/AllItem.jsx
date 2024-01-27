import { useEffect, useState } from "react";
import { Container, Button, Link, ListItem, ListItemText, Dialog, Typography, DialogActions, DialogContent, DialogTitle, Link as MuiLink, Box} from '@mui/material';
import axios from 'axios';

import { getJwtToken } from '../../utils/jwtTokenUtils';
import PdfViewer from '../Visa/PdfViewer';

const nextStepMap = {0:'Done',1:'opt receipt', 2: 'EAD card', 3: 'i983', 4:'i20', 5: 'Waiting for approval'};


const AllItem = ({employee}) => {
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState({});
    const [curDocType, setCurDocType] = useState(undefined);

    useEffect(() => {
        const convertbase64ToUrl = (str) => {
            if(!str) return null;
            const byteCharacters = atob(str);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: 'application/pdf' });
              const url = URL.createObjectURL(blob);
              return url;
        }
        let receiptFile = convertbase64ToUrl(employee?.document?.receipt?.link[0]?.data);
        let eadFile = convertbase64ToUrl(employee?.document?.ead?.link[0]?.data);
        let i983File = convertbase64ToUrl(employee?.document?.i983?.link[0]?.data);
        let i20File = convertbase64ToUrl(employee?.document?.i20?.link[0]?.data);
        let files = {receipt: receiptFile, ead: eadFile, i983: i983File, i20: i20File};
        setFileList(files)
    },[employee]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    const handlePreview = (base64Str) => {
        setPreviewFile(base64Str);
        setPreviewOpen(true);
    }

    return (
      <Container>
        <ListItem key={employee.ssn} divider>
          <ListItemText
            primary={
              <MuiLink
                component="button"
                variant="body2"
                onClick={() => handleClickOpen()}
              >
                {employee.name.firstName}&nbsp;{employee.name.lastName}
              </MuiLink>
            }
          />
        </ListItem>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={false}>
          <DialogTitle id="employee-details-title">Documents</DialogTitle>
          <DialogContent>
            {fileList && (
              <div>
                <h3>{"Receipt: "}</h3>
                <Box
                  sx={{typography: "body1","& > :not(style) ~ :not(style)": {ml: 2,},
                  }}
                >
                  <Link href="#" onClick={() => handlePreview(fileList.receipt)}>
                    preview
                  </Link>
                  <Link href={fileList.receipt} download="receipt.pdf">
                    Download
                  </Link>
                </Box>

                <h3>{"Ead: "}</h3>
                <Box
                  sx={{typography: "body1","& > :not(style) ~ :not(style)": {ml: 2,},
                  }}
                >
                  <Link href="#" onClick={() => handlePreview(fileList.ead)}>
                    preview
                  </Link>
                  <Link href={fileList.ead} download="ead.pdf">
                    Download
                  </Link>
                </Box>
                <h3>{"I983: "}</h3>
                <Box
                  sx={{typography: "body1","& > :not(style) ~ :not(style)": {ml: 2,},
                  }}
                >
                  <Link href="#" onClick={() => handlePreview(fileList.i983)}>
                    preview
                  </Link>
                  <Link href={fileList.i983} download="i983.pdf">
                    Download
                  </Link>
                </Box>
                <h3>{"I20: "}</h3>
                <Box
                  sx={{typography: "body1","& > :not(style) ~ :not(style)": {ml: 2,},
                  }}
                >
                  <Link href="#" onClick={() => handlePreview(fileList.i20)}>
                    preview
                  </Link>
                  <Link href={fileList.i20} download="i20.pdf">
                    Download
                  </Link>
                </Box>
                {/* {pdfFile ? (
                  <iframe
                    title="PDF Viewer"
                    width="1200"
                    height="600"
                    src={`data:application/pdf;base64,${pdfFile}`}
                  />
                ) : (
                  <p>No Documents</p>
                )} */}
              </div>
            )}
          </DialogContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          fullWidth
          maxWidth={false}
        >
          <DialogTitle>Prview Document</DialogTitle>
          <DialogContent>
            <PdfViewer base64String={previewFile} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
}

export default AllItem;