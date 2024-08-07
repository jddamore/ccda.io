import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";

/*
const Item = styled(Paper)(({ theme }) => ({
  //  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  card: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "black",
    backgroundColor: "white",
  },
};
*/

export class About extends Component {

  goto = (event) => {
    console.log(this.props)
    this.props.navigate(event.target.id)
  }

  render() {
    return (
      <div>
        <Typography variant="h2" gutterBottom>
          Welcome to <span style={{ fontFamily: "monospace" }}>ccda.io:</span>{" "}
          <span style={{ color: "#aaaaaa" }}>Tools for C-CDA Documents</span>
        </Typography>{" "}
        <Grid container spacing={2}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8} style={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "30px", color: "#555555" }}
            >
              Consolidated Clinical Document Architecture (C-CDA) is a medical
              data standard, used millions of times each day to exchange health
              information. This web app provides the utilities listed below for
              handling C-CDA documents:
            </Typography>
            <ul style={{ fontSize: "30px", color: "#555555"}}>
              <li>
                <Button id="validate" style={{ fontSize: "30px" }} onClick={this.goto}>VALIDATE</Button>: A
                Validator of C-CDA Documents
              </li>
              <li>
                <Button id="render" style={{ fontSize: "30px" }} onClick={this.goto}>RENDER</Button>: View your
                C-CDA Using XLST Stylesheets
              </li>
              <li>
                <Button id="fragment" style={{ fontSize: "30px" }} onClick={this.goto}>FRAGMENT</Button>: Validate
                a C-CDA Fragment
              </li>
              <li>
                <Button id="convert" style={{ fontSize: "30px" }} onClick={this.goto}>CDA↔FHIR</Button>:
                Highlight CDA to FHIR Conversions
              </li>
            </ul>
            Here are some other useful resources, hosted elsewhere:
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "30px", color: "#555555" }}
            ></Typography>
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
        <Card sx={{ width: "20vw", marginLeft: "6%", float: "left" }}>
          <CardActionArea
            onClick={() =>
              window.open("https://hl7.org/cda/us/ccda/index.html", "_blank")
            }
          >
            <CardMedia
              sx={{ height: "5vw" }}
              image="cda.png"
              title="HL7 C-CDA Logo"
            />
            <CardContent sx={{ height: "5vw" }}>
              <Typography gutterBottom variant="h5" component="div">
                HL7 Official C-CDA Standard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Click for the latest C-CDA R3.0 version, available online. For
                previous version, go to HL7.org and download the PDF version or
                use the online navigator
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: "20vw", marginLeft: "2%", float: "left" }}>
          <CardActionArea
            onClick={() =>
              window.open("https://site.healthit.gov/sandbox-ccda", "_blank")
            }
          >
            <CardMedia
              sx={{ height: "5vw" }}
              image="healthitlogo.png"
              title="HL7 C-CDA Logo"
            />
            <CardContent sx={{ height: "5vw" }}>
              <Typography gutterBottom variant="h5" component="div">
                HealthIT.gov Testing Tools
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The Office of the National Coordinator (ONC) offers an
                implementation website with a host of testing and certification
                tools.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: "20vw", marginLeft: "2%", float: "left" }}>
          <CardActionArea
            onClick={() =>
              window.open("https://github.com/jddamore/ccda-samples", "_blank")
            }
          >
            <CardMedia
              sx={{ height: "5vw" }}
              image="github.png"
              title="HL7 C-CDA Logo"
            />
            <CardContent sx={{ height: "5vw" }}>
              <Typography gutterBottom variant="h5" component="div">
                Public C-CDA Samples
              </Typography>
              <Typography variant="body1" color="text.secondary">
                401 samples from certified Health Information Technologies
                (Health IT) are hosted in this public repository as part of a
                2018 research project
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: "20vw", marginLeft: "2%", float: "left" }}>
          <CardActionArea
            onClick={() =>
              window.open("https://hl7.org/fhir/us/ccda/", "_blank")
            }
          >
            <CardMedia
              sx={{ height: "5vw" }}
              image="ccdafhir.png"
              title="HL7 C-CDA to FHIR"
            />
            <CardContent sx={{ height: "5vw" }}>
              <Typography gutterBottom variant="h5" component="div">
                HL7 C-CDA to FHIR Guide
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A guide for the mapping of C-CDA content to FHIR. Last Published
                in March 2024 with the input of 5+ vendors working on the
                transition to FHIR
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8} style={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "20px", color: "#555555" }}
            >
              This website is provided free of charge and is publicly available
              through this{" "}
              <a href="https://github.com/jddamore/ccda.io" targte="_blank">
                GitHub respository
              </a>
              . Downloading a local instance is best when dealing with protected
              health information. Click
              <Button>here</Button> to check status of services may be checked.
              <br/>
              THE SOFTWARE AND INFORMATION ARE PROVIDED "AS IS", WITHOUT
              WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
              OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
              OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
              OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </Typography>
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
        <div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default About;

/*
        <Card sx={{ width: "20vw", marginLeft: "2%", float: "left" }}>
          <CardActionArea
            onClick={() => window.open("https://cdasearch.hl7.org", "_blank")}
          >
            <CardMedia
              sx={{ height: "5vw" }}
              image="cdasearch.png"
              title="HL7 C-CDA Logo"
            />
            <CardContent sx={{ height: "6vw" }}>
              <Typography gutterBottom variant="h5" component="div">
                Approved HL7 Examples
              </Typography>
              <Typography variant="body1" color="text.secondary">
                401 samples from Certified Health Technologies are hosted in
                this public repository as part of a 2018 research project
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

*/
