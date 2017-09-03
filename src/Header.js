import React,{Component} from 'react';
import { Header,Grid } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

export default class HEADER extends Component {

    render() {
        return (
            <div className="class-name">
            <Header as='h3' block>
              <Grid>
                <Grid.Column floated='left' width={4}>
                  <Link to='/'>Product Hunt PWA</Link>
                </Grid.Column>
                <Grid.Column floated='left' width={4}>

                </Grid.Column>
                <Grid.Column floated='right' width={4}>
                  <Link to='/tech'>tech</Link>
                </Grid.Column>
                <Grid.Column floated='right' width={4}>
                  <Link to='/game'>game</Link>
                </Grid.Column>
              </Grid>
            </Header>
            </div>
        );
    }
}
