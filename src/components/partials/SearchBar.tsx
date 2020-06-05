import React, { useState, useEffect } from 'react';
import { Search as SearchIcon  } from '@material-ui/icons';
import { connect } from 'react-redux';
import { User } from 'store/types';
import { AppState } from 'store/reducers';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Bookmark as BookmarkIcon } from '@material-ui/icons';
import { AppBar, Toolbar, makeStyles, fade, InputBase, Badge, ButtonBase } from '@material-ui/core';

type OwnProps = {
  placeholder: string;
  searchShows: (value: string) => void;
}

type Props = OwnProps & StoreStateProps & RouteComponentProps

const useStyles = makeStyles((theme) => ({
  search:{
    position: 'relative',
    borderRadius: 3,
    backgroundColor: fade(theme.palette.common.white, 0.2),
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
    paddingLeft: 10
  },
  searchInput: {
    padding: '2px 4px 2px 40px',
    maxWidth:300,
    color:'inherit',
    '& input': {
      paddingTop: 5,
    }
  }
}));

const SearchBar: React.FC<Props> = (props) => {
    const { search, searchIcon, searchInput } = useStyles();

    const [searchedText, setSearchedText] = useState('');

    
    // Sending the searched text to parent when its state gets updated
    useEffect(() => {
      props.searchShows(searchedText);
    }, [searchedText]);

    const wishlistItemsLength =  () => {
      if(props.user){
        const length = props.user?.wishlist.movie.length + props.user?.wishlist.tv.length;
        return length;
      }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchedText(e.target.value);
    };

    return (
        <AppBar
          position="static"
          style={{ marginBottom: 20 }}
        >
            <Toolbar style={{ padding: '0 15px' }}
              variant="dense"
            >
                <div className={search}>
                    <div className={searchIcon}>
                        <SearchIcon fontSize="small" />
                    </div>
                    <InputBase
                      onChange={onChangeHandler}
                      margin="dense"
                      placeholder={props.placeholder} // Need to be prop
                      className={searchInput}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <Badge 
                  style={{ marginLeft:'auto', marginRight: 10, cursor:'pointer' }}
                  badgeContent={wishlistItemsLength()}
                  showZero
                  color="secondary"
                >
                    <BookmarkIcon fontSize="small"/>
                </Badge>
        
            </Toolbar>
        </AppBar>
    );
};

type StoreStateProps = {
  user: User;
}

const mapStoreStateToProps = (state: AppState): StoreStateProps => ({
  user: state.userAuth.user
});

export default  withRouter(connect<StoreStateProps, {}, OwnProps, AppState>(mapStoreStateToProps)(SearchBar));