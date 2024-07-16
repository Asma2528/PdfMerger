const express = require('express');
const path = require('path');
const app = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const PORT = process.env.PORT || 3002;
const {mergePdfs}=require('./merge.js');
const fs=require('fs');

// To server static files in express
app.use('/static', express.static('public'))

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));


// All other routes should serve the index.html from the dist directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/src', 'index.html'));
});


// pdfs - name attribute of input type="file"
app.post('/merge', upload.array('pdfs', 4), async(req,res,next)=>{
  try {
    if (req.files.length < 2) {
        throw new Error('At least 2 PDF files are required for merging.');
    }

     // Ensure all uploaded files exist and are accessible
     req.files.forEach(file => {
      if (!file.path || !fs.existsSync(file.path)) {
          throw new Error('One or more files are missing or could not be accessed.');
      }
  });

  // Prepare paths for mergePdfs function
  let paths = req.files.map(file => path.join(__dirname, file.path));

  // Proceed with merging
  let d = await mergePdfs(...paths);

    res.redirect(`http://localhost:3000/static/${d}.pdf`);
} catch (err) {
    console.error('Error merging PDFs:', err.message);
    res.status(400).json({ error: err.message }); // Respond with an error message
}
});


app.listen(PORT, () => {
  console.log(`PDF Merger app listening on port http://localhost:${PORT}`);
});
