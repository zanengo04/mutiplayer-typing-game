import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    backgroundColor: "white",
    marginBottom: "15px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    language: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Language</InputLabel>
        <Select
          native
          value={state.language}
          onChange={handleChange}
          label="Language"
          inputProps={{
            name: 'language',
            id: 'outlined-language-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'english'}>English</option>
          <option value={'korean'}>Korean</option>
        </Select>
      </FormControl>
    </div>
  );
}