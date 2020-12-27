import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Container from "@material-ui/core/Container";
import ImageUploader from "react-images-upload";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { CountrySelect } from "../Navigation";

import * as styles from "../../styles/styles";
import ReactMarkdown from "react-markdown";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Session";
import { withAuthorization } from "../Session";
import News from "../News";
import * as ROLES from "../../constants/roles";
const moment = require("moment");

const CreateNews = (props) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(markdown_description_label);
  const [location, setLocation] = useState("worldwide");
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const firebase = useContext(FirebaseContext);
  const user = useContext(AuthUserContext);
  const classes = styles.useStyles();

  var globalData = { Country: "Worldwide", Slug: "worldwide", ISO2: "WW" };
  var countrySelectData = props.countries.slice();
  countrySelectData.unshift(globalData);

  function submitNews() {
    if (!title || !content || !image) {
      setError({
        message: "You must insert image, title and content before submit",
      });
    } else {
      setError("");
      setMessage("");
      setUploading(true);
      var imagePath = uuidv4() + "-" + image.name;
      firebase
        .storeImage(imagePath, image)
        .then((imageLink) => {
          var news = new News(
            location,
            title,
            imageLink,
            imagePath,
            content,
            user.uid,
            user.username,
            moment().format("YYYY-MM-DD")
          );
          firebase.addNews(news).then(() => {
            setUploading(false);
            setTitle("");
            setContent(markdown_description_label);
            setImage(null);
            setMessage(
              "News has been uploaded. You can create another article or browse the website"
            );
          });
        })
        .catch((err) => {
          setError(err.message);
          firebase.removeImage(imagePath);
          setUploading(false);
        });
    }
  }
  const countrySelectHandler = (value) => {
    setLocation(value.Slug);
  };

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
              disabled={uploading}
              value={image}
              withIcon={true}
              buttonText="Choose front image"
              onChange={(image) => {
                setImage(image[0]);
              }}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview={true}
              singleImage={true}
            />
          </Grid>
          <Grid item xs={10} align="center">
            <CountrySelect
              loading={props.loading}
              countries={countrySelectData}
              error={props.error}
              handleSubmit={countrySelectHandler}
            />
          </Grid>
          <Grid item xs={10} align="center">
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input
              disabled={uploading}
              value={title}
              id="component-simple"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              style={{ width: "50%" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              disabled={uploading}
              multiline
              id="outlined-multiline-static"
              value={content}
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
            <Button
              disabled={uploading}
              variant="contained"
              onClick={() => submitNews()}
            >
              Submit News
            </Button>
          </Grid>
          {uploading && (
            <Grid item xs={10} align="center">
              <CircularProgress />
            </Grid>
          )}
          {message && (
            <Grid item xs={6}>
              <Alert severity="success">{message}</Alert>
            </Grid>
          )}
        </Grid>
      </div>
    </Container>
  );
};

const markdown_description_label =
  "Use *markdown* to write your article, \
see [this reference](https://markdown-it.github.io/) to learn more about it.";

const condition = (authUser) => authUser && !!authUser.roles[ROLES.WRITER];

export default withAuthorization(condition)(withRouter(CreateNews));
