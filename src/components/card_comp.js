import React from 'react';
import {Grid,Card,CardActionArea,CardContent,CardMedia,Typography} from '@material-ui/core';

import data from '../data.json'

export default class MediaCard extends React.Component {
  state = {
    base:'INR',
    curriencies:['INR','USD'],
    convertTo:["USD"],
    result:"",
  }
  handleChange = e => {
    this.setState({
        [e.target.name]:e.target.value,
        result:null
    },this.calculate)
}
calculate=(value)=>{
        fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res=>res.json())
        .then(data=>{
            const result = (data.rates[this.state.convertTo])*value.toFixed(2)
        this.setState({result})
        })
      }
  render(){
    return (
      <Grid container style={{flexGrow: 1,paddingTop:100}} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={9}>
            {data.map(value => (
              <Grid key={value.id} item>
                <Card style={{maxWidth:400}}>
                  <CardActionArea>
                    <CardMedia
                      style={{height:140}}
                      image={value.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                        {value.text}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                        {this.calculate(value.price) ? this.state.result : value.price} {this.state.base}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>      
        <Card>
          <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>currency
          <select  name='base' value={this.state.base} onChange={this.handleChange}>
            {
              this.state.curriencies.map(currency =>
                <option key={currency} value={currency}>
                  {currency}
                </option>
              )
            }
          </select>
          </Typography>
        </Card>  
      </Grid>
    );
  }
}
