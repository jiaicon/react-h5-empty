const { exec } = require('child_process');
const express = require('express');

const app = express();
app.listen(3000);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  // res.send('hello world')
  exec('sh ./tools/deploy-testserver.sh', { cwd: '..' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.send(`deploy error: ${error} `);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    res.send(`${stdout}<h4 style="color:green;">部署成功&nbsp;${new Date()}</h4>`);
  });
});
