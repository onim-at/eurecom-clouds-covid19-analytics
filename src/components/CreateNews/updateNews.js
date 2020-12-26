import React, { useState, useEffect, useContext } from "react";
import { useParams, withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Container from "@material-ui/core/Container";
import ImageUploader from "react-images-upload";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import * as styles from "../../styles/styles";
import ReactMarkdown from "react-markdown";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Session";
import { withAuthorization } from "../Session";
import News from "../News";
import * as ROLES from "../../constants/roles";
const moment = require("moment");

const UpdateNews = (props) => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [location, setLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [oldNews, setOldNews] = useState(true);
  const firebase = useContext(FirebaseContext);
  const user = useContext(AuthUserContext);
  const classes = styles.useStyles();

  useEffect(() => {
    setLoading(true);
    var news = props.location.state;

    setImage({ url: news.image, path: news.imagePath, notModified: true });
    setContent(news.content);
    setTitle(news.title);
    setLocation(news.location);
    setOldNews(news);
  }, []);

  function updateNews() {
    if (!title || !content || !image) {
      setError({
        message: "You must insert image, title and content before submit",
      });
    } else {
      setError("");

      if (image.notModified) {
        var news = new News(
          location,
          title,
          image.url,
          image.path,
          content,
          user.uid,
          user.username,
          moment().format("YYYY-MM-DD")
        );
        console.log(oldNews)
        firebase.updateNews(oldNews.newsid, news).then(() => {
          // show ok message
          // redirect to your new in x seconds or by clicking on new button
        });
      } else {
        var imagePath = uuidv4() + "-" + image.name;

        firebase
          .storeImage(imagePath, image)
          .then((imageLink) => {
            console.log("LINK", imageLink);
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
            firebase.updateNews(oldNews.newsid, news).then(() => {
              firebase.removeImage(oldNews.imagePath);
              // show ok message
              // redirect to your new in x seconds or by clicking on new button
            });
          })
          .catch((err) => {
            setError(err.message);
            firebase.removeImage(imagePath);
          });
      }
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
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input
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
            <Button variant="contained" onClick={() => updateNews()}>
              Modify News
            </Button>
            <Button variant="contained" onClick={() => false}>
              Delete News
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.WRITER];

export default withAuthorization(condition)(withRouter(UpdateNews));
