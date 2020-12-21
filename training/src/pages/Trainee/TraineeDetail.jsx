import React, { Component } from 'react';
import { Button, Card } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import traineeData from './data/trainee';
import { NoMatch } from '../NoMatch/index';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';

const useStyles = (theme) => ({
  card: {
    margin: theme.spacing.unit * 3,
    display: 'flex',
  },
  cardMedia: {
    width: 170,
    backgroundColor: '#545454',
    display: 'flex',
    alignItems: 'center',
  },
  cardDetails: {
    flex: 1,
  },
  backContainer: {
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    marginLeft: theme.spacing(5),
  },
});

class TraineeDetails extends Component {
  getTrainee() {
    const { match: { params: { id } } } = this.props;
    return traineeData.find((item) => item.id === id);
  }

  render() {
    const { classes } = this.props;
    const trainee = this.getTrainee();
    if (!trainee) {
      return <NoMatch />;
    }

    return (
      <>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp00rS6Jtn12he31BEFHdF5xPU2aRqr2Ty7w&usqp=CAU"
            title="Image title"
          >
            <div className={classes.text}>Thumbnail</div>
          </CardMedia>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {trainee.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {
                  getDateFormatted(trainee.createdAt)
                }
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {trainee.email}
              </Typography>
            </CardContent>
          </div>
        </Card>
        <div className={classes.backContainer}>
          <Button
            component={Link}
            to="/trainee"
            color="default"
            variant="contained"
          >
            Back
          </Button>
        </div>
      </>
    );
  }
}
TraineeDetails.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default withStyles(useStyles)(TraineeDetails);
