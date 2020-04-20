import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import {Container,NativeSelect,Breadcrumbs,Typography} from '@material-ui/core';
import styles from './App.module.css';
import ProgressBar from "react-bootstrap/ProgressBar";
import 'bootstrap/dist/css/bootstrap.css';
import image from './images/image.png';
import PublicIcon from '@material-ui/icons/Public';
import MapChart from './MapChart';
import CountUp from 'react-countup';
import BarChart from './Bar';
import PieChart from './Pie';



export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      date:new Date(),
      new:0,
      total:0,
      deaths:0,
      recovered:0,
      results:0,
      count:'',
      countries:[],
      currentCountry:'',
      day:0,
      percentCase:0,
      percentRecovered:0,
      percentNew:0,
      percentDeaths:0
      
    }
  }

  

  
  componentDidMount()
  {
    
    axios.get("https://covid-193.p.rapidapi.com/statistics",{ headers:  {'x-rapidapi-key' : '1ba4788a8dmshad1c43e94c4c80cp12ce7djsn4a047e8ff6fa'}  })
    .then(res => {
      
      const countries = res.data.response
      const results = res.data.results
  
      this.setState({ countries ,results:results
      
      });
    })

    axios.get(`https://covid-193.p.rapidapi.com/statistics?country=All`,{ headers:  {'x-rapidapi-key' : '1ba4788a8dmshad1c43e94c4c80cp12ce7djsn4a047e8ff6fa'}  })
    .then(res => {
      const date = res.data.response[0].day
      const cases = res.data.response[0].cases
      const de= res.data.response[0].deaths
      
      this.setState({ 
        count:`တကမ္ဘာလုံး`,
        new :cases.new,
        total:cases.total,
        recovered:cases.recovered,
        deaths:de.total,
        day:date,  
        percentNew:Math.floor((cases.new/cases.total)*100),
        percentRecovered:Math.floor((cases.recovered/cases.total)*100),
        percentDeaths:Math.floor((de.total/cases.total)*100),         
        
        });
        
        
      })

  }
  handleChange = (currentCountry) => {
    

    this.setState({
      count:currentCountry.target.value
    })
    this.setState({ currentCountry : currentCountry.target.value});
    axios.get(`https://covid-193.p.rapidapi.com/statistics?country=${currentCountry.target.value}`,{ headers:  {'x-rapidapi-key' : '1ba4788a8dmshad1c43e94c4c80cp12ce7djsn4a047e8ff6fa'}  })
    .then(res => {
      const date = res.data.response[0].day
      const cases = res.data.response[0].cases
      const de= res.data.response[0].deaths
      
      this.setState({ 
        new :cases.new,
        total:cases.total,
        recovered:cases.recovered,
        deaths:de.total,
        day:date,
        percentNew:Math.floor((cases.new/cases.total)*100),
        percentRecovered:Math.floor((cases.recovered/cases.total)*100),
        percentDeaths:Math.floor((de.total/cases.total)*100),
        
        });
    })
  }
  handleClick()
  {  
    this.setState({
      count:`တကမ္ဘာလုံး`
    })
    this.setState({ currentCountry : `တကမ္ဘာလုံး`});
    axios.get(`https://covid-193.p.rapidapi.com/statistics?country=All`,{ headers:  {'x-rapidapi-key' : '1ba4788a8dmshad1c43e94c4c80cp12ce7djsn4a047e8ff6fa'}  })
    .then(res => {
      const date = res.data.response[0].day
      const cases = res.data.response[0].cases
      const de= res.data.response[0].deaths
      
      this.setState({ 
        new :cases.new,
        total:cases.total,
        recovered:cases.recovered,
        deaths:de.total,
        day:date,
        percentNew:Math.floor((cases.new/cases.total)*100),
        percentRecovered:Math.floor((cases.recovered/cases.total)*100),
        percentDeaths:Math.floor((de.total/cases.total)*100),    
        
        });
      })
  }

  handleClickEach =(e) =>
  {
    console.log(e);
    this.setState({
      count:e
    })
    this.setState({ currentCountry : e});
    axios.get(`https://covid-193.p.rapidapi.com/statistics?country=${e}`,{ headers:  {'x-rapidapi-key' : '1ba4788a8dmshad1c43e94c4c80cp12ce7djsn4a047e8ff6fa'}  })
    .then(res => {
      if(res.data.response[0] === undefined)
      {
        alert('ယခုနိုင်ငံသည်ယခုထိCOVID-19ကူးစက်မှုမရှိသေးပါ');
        var date = 0
        var cases = 0
        var  de = 0
      }
      else
      {
         date = res.data.response[0].day
         cases = res.data.response[0].cases
         de= res.data.response[0].deaths
        
      }
      console.log(res.data.response[0]);
      
      
      this.setState({ 
        new :cases.new,
        total:cases.total,
        recovered:cases.recovered,
        deaths:de.total,
        day:date,
        percentNew:Math.floor((cases.new/cases.total)*100),
        percentRecovered:Math.floor((cases.recovered/cases.total)*100),
        percentDeaths:Math.floor((de.total/cases.total)*100),
        
        });
    })
    
  }
  
  render()
  {

    return(
<Box bgcolor="#b3e5fc">
  <Container maxWidth="xl">
    <Grid container spacing={4}>
        <Grid item xs>
          <Paper >
          <Card style={{ backgroundColor : "#e6ee9c" }}>
                <CardContent>
               
                    
                    <div className="card bg-warning text-white card-body">
                     
                    <h2><PublicIcon fontSize="large"/><CountUp start={0} end={parseInt(this.state.total)} duration={2.75} separator="," /></h2>
                    </div> 

                    <div className="card-footer">စုစုပေါင်းကူးစက်ခံရသူ</div>
                   
                </CardContent>
                
              
              </Card>
            
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
          <Card style={{ backgroundColor: "#80cbc4" }}>
                <CardContent>
                 
                  
                    <div className="card bg-success text-white card-body ">
                      
                      <h2><DirectionsRunIcon fontSize="large"/><CountUp start={0} end={parseInt(this.state.recovered)} duration={2.75} separator="," /></h2>
                    </div> 
                    <div className="card-footer">ပြန်လဲသက်သာလာသူ {`${this.state.percentRecovered}%`}</div>
                    
                    </CardContent>
                    <ProgressBar variant="success"animated now={this.state.percentRecovered}/>
                </Card>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
          <Card style={{ backgroundColor : "#bbdefb" }}>
                  <CardContent>
                  
                  
                    <div className="card bg-primary text-white card-body ">
                      
                      <h2><AccessibilityIcon fontSize="large"/><CountUp start={0} end={parseInt(this.state.new)} duration={2.75} separator="," /></h2>
                    </div> 
                    <div className="card-footer">အသစ်ထက်တွေ့မှု {`${this.state.percentNew}%`}</div>
                    
                    </CardContent>
                    <ProgressBar variant="primary"animated now={this.state.percentNew}/>
                    </Card>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>

              <Card style={{ backgroundColor : "#ef9a9a" }}>
                <CardContent >
                  <div className="card bg-danger text-white card-body">
                      
                      <h2><AccessibilityIcon fontSize="large"/><CountUp start={0} end={parseInt(this.state.deaths)} duration={2.75} separator="," /></h2>
                    </div> 
                    <div className="card-footer">သေဆုံးသူ {`${this.state.percentDeaths}%`}</div>
                    
                </CardContent>
                <ProgressBar variant="danger"animated now={this.state.percentDeaths}/>
              </Card>
          </Paper>
        </Grid>
      </Grid>
      <hr/>
      <Grid container spacing={3}>
        <Grid item sm>
          
          <NativeSelect
          
          onChange={this.handleChange}
          name="age"inputProps={{ 'aria-label': 'age' }}>

            <option value="All">Select Country</option>
            {
              
              this.state.countries.map(res =>
                
                <option key={res.country}value={res.country}>{res.country}</option>
              
            
              )}
    
          </NativeSelect>
          
          
        </Grid>
        <Grid item sm>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">

              <Button variant="outlined" color="primary" disableElevation>
                {this.state.count}
              </Button>{this.state.date.getDate()}.{this.state.date.getMonth()}.{this.state.date.getFullYear()}ရက်နေ့အထိ<img className={styles.image} src={image} alt="COVID-19" />ကူးစက်မှုအခြေအနေ
          </Typography>

          </Breadcrumbs> 
        </Grid>
        <Grid item sm>
          
        <Button variant="outlined" color="secondary" onClick={() => this.handleClick()}>
              <PublicIcon/>တကမ္ဘာလုံးCOVID-19ကူးစက်မှုအခြေအနေ
        </Button>
        </Grid>

        
      </Grid>

      <Grid container spacing={2}>
          {/* Bar Chart  */}
      <Grid item xs>

        <Paper>
            <BarChart total={this.state.total}
            recovered={this.state.recovered}
            deaths={this.state.deaths}
            date={this.state.date}
            count={this.state.count}  
            />

            </Paper>
        </Grid>
          {/* Pie Chart  */}
        <Grid item xs>

            <Paper>
              <PieChart total={this.state.total}
              recovered={this.state.recovered}
              deaths={this.state.deaths}
              date={this.state.date}
              count={this.state.count}  
              />
            
            </Paper>
        </Grid>
            <Grid item xs={12}>
            <Paper>

            {/* World Map  */}
                <MapChart name={this.handleClickEach}/>     

            </Paper>
            <Button variant="outlined" color="secondary">
                Developed by APK
            </Button>
            </Grid>
      </Grid>
      
            
    </Container>
    </Box>
       
    );

  }
}
