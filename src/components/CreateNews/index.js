import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import ImageUploader from "react-images-upload";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert"
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import * as styles from "../../styles/styles";
import ReactMarkdown from "react-markdown";

const moment = require("moment");

const CreateNews = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(markdown_description_label);
  const [error, setError] = useState(false);
  const classes = styles.useStyles();
  const country = "italy";

  function submitNews() {
    if (!title || !content) {
      setError({message: "Please insert a valid title or content"});
    } else {
      setError("");
      // call api to upload data
      // show ok message
      // redirect to your new in x seconds or by clicking on new button
    }
  }

  return (
    <Container>
      <div className={classes.paper}>
        <Grid container justify="center" direction="row" spacing={4}>
          {error && (
            <Grid item xs={8}>
              <Alert severity="error">{error.message}</Alert>
            </Grid>
          )}
          <Grid item xs={8}>
            <ImageUploader
              withIcon={true}
              buttonText="Choose front image"
              onChange={(image) => {
                setImage(image);
                console.log(image);
              }}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview={true}
              singleImage={true}
            />
          </Grid>
          <Grid item xs={10} align="center">
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input
              id="component-simple"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              style={{ width: "50%" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              multiline
              id="outlined-multiline-static"
              defaultValue={markdown_description_label}
              variant="outlined"
              onChange={(event) => {
                setContent(event.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <ReactMarkdown skipHtml>{content}</ReactMarkdown>
          </Grid>

          <Grid item xs={10} align="center">
            <Button variant="contained" onClick={() => submitNews()}>Submit News</Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const markdown_description_label =
  "Use *markdown* to write your article, \
see [this reference](https://markdown-it.github.io/) to learn more about it.";

export default CreateNews;
