import React from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
    Link
} from '@mui/material';

const DocumentsSection = ({ data }) => {

    const handleDownload = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePreview = (url) => {
        // 使用window.open()在新窗口中打开预览
        window.open(url, '_blank');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Documents
                </Typography>

                <Box>
                    <List>
                        {data.documents.map((document, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={document.name} />
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleDownload(document.url, document.name)}
                                >
                                    Download
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => handlePreview(document.url)}
                                >
                                    Preview
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Paper>
        </Container>
    );
};

export default DocumentsSection;
