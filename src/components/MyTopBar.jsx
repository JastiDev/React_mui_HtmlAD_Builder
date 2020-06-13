import React from 'react'
import { Toolbar, IconButton, Button } from "@material-ui/core";
// import Logo from "../logo.png";

// import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
// import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';

export const MyTopBar = ({ handleNew, handleSave, handleImport, handleExport, handleExportPdf }) => {
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
      >
        get pdf
        </Button>

    </div>
  );
}
