import React from 'react'
import { Button, CircularProgress } from "@material-ui/core";
// import Logo from "../logo.png";

// import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
// import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';

export const MyTopBar = ({ handleNew, handleSave, handleImport, handleExport, handleExportPdf, isBusyPdf}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>

      {/* <Button
        variant="contained"
        color="primary"
        style={{ color: 'white', borderColor: 'white' }}
        startIcon={<CreateNewFolderIcon />}
        onClick={handleNew}
      >
        New
        </Button> */}

      <Button
        variant="contained"
        color="primary"
        // style={{ color: 'white', borderColor: 'white'}}
        startIcon={<SaveIcon />}
        onClick={handleSave}
      >
        save as template
        </Button>
      
      {/* <Button
        variant="contained"
        color="primary"
        style={{color:'white', borderColor:'white'}}
        startIcon={<ImportExportIcon />}
        onClick={handleImport}
      >
        import html
        </Button> */}

      <Button
        variant="contained"
        color="primary"
        // style={{color:'white', borderColor:'white'}}
        startIcon={<DeveloperModeIcon />}
        onClick={handleExport}
      >
        get html
        </Button>

      <Button
        variant="contained"
        color="primary"
        // style={{color:'white', borderColor:'white'}}
        startIcon={<PictureAsPdfIcon />}
        onClick={handleExportPdf}
        disabled={isBusyPdf}
      >
        get pdf
         {isBusyPdf && <CircularProgress size={14} />}
        </Button>

    </div>
  );
}
