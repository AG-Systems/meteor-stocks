import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.html';
var inputstock = "";
var App = React.createClass({
  getInitialState: function() {
    return {
      text: ""
    };
  },
  handleChange: function(event) {
    inputstock = event.target.value;
    this.setState({ text: event.target.value });
    this.stockdata(inputstock);
  },
stockdata: function(stockname) 
{
        var nameprice = stockname.toUpperCase() + " Stock Price";
         $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + stockname.toLowerCase() + '-c.json&callback=?',    function (data) {
            $('#stockgraph').highcharts('StockChart', {
                
    
                rangeSelector : {
                    selected : 1
                },
    
                title : {
                    text : nameprice
                },
                
                series : [{
                    name : stockname.toUpperCase(),
                    data : data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
                
            }, function(chart){
    
                setTimeout(function () {
                    $('input.highcharts-range-selector', $(chart.container).parent())
                        .datepicker();
                }, 0);
            });
        });
        
        
        $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd',
            onSelect: function(dateText) {
                this.onchange();
                this.onblur();
            }
        });   
},

  render: function() {
    return (
      <div className="">
        <textarea className="form-control"
                  onChange={this.handleChange} placeholder="Enter Symbol">
        </textarea>
        <br/>
            <div id="container">
            </div>
            <div id="stockgraph"> 
            </div>
      </div>
    );
  }
});


Meteor.startup(() => {
      render(<App />, document.getElementById('render-target'));
});
