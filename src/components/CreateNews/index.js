import React, { useState, useEffect, useContext, useMemo } from "react";
import ImageUploader from "react-images-upload";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

import * as styles from "../../styles/styles";
const moment = require("moment");

const CreateNews = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const classes = styles.useStyles();
  const country = "italy";

  return (
    <div className={classes.paper}>
      <Grid container justify="center" direction="row" spacing={4}>
        <Grid item xs={8}>
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={(image) => {
              console.log(image.get());
              setImage(image);
            }}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input
              id="component-simple"
              onChange={(value) => {
                setTitle(value);
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={10}>
          <FormControl>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="outlined"
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateNews;
