import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, makeStyles, fade, InputBase } from '@material-ui/core';
import { Search as SearchIcon  } from '@material-ui/icons';

type OwnProps = {
  placeholder: string;
  searchShows: (value: string) => void;
}

type Props = OwnProps;

const useStyles = makeStyles((theme) => ({
  search:{
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 7
  },
  searchInput: {
    padding: '0px 4px 0px 40px',
    width:180,
    color:'inherit',
    '& input': {
      paddingTop: 5,
    }
  }
}));

const SearchBar: React.FC<Props> = (props) => {
    const { search, searchIcon, searchInput } = useStyles();

    const [searchedText, setSearchedText] = useState('');

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchedText(e.target.value);
    };

    // Sending the searched text to parent when its state gets updated
    useEffect(() => {
      props.searchShows(searchedText);
    }, [searchedText]);


    return (
        <AppBar
          position="static"
          style={{ marginBottom: 20 }}
        >
            <Toolbar style={{ padding: '0 12px' }}
              variant="dense"
            >
                <div className={search}>
                    <div className={searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                      onChange={onChangeHandler}
                      margin="dense"
                      placeholder={props.placeholder} // Need to be prop
                      className={searchInput}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default SearchBar;