"use client"

import { TextField, Typography } from '@mui/material';
import { useCallback, useRef } from 'react';

import { useRouter } from 'next/router';

// TO DO: to move this hook function to the separate file
function useDebounce(callback, delay) {
  const timerRef = useRef(null);

  return useCallback((...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

export default function InboxSearchSection() {
  const router = useRouter();

  const handleSearchRedirect = (searchText) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: searchText },
    });
  }

  const debouncedSearch = useDebounce(handleSearchRedirect, 500);

  const handleSearchFieldChange = (event) => {
    const searchQuery = event?.target?.value || '';

    // debouncing the search operation
    debouncedSearch(searchQuery)
  }

  return (
    <>
      <Typography variant="h5">Inbox</Typography>
      <TextField
        id="outlined-search"
        fullWidth
        variant="standard"
        label="Search mail"
        type="search"
        onChange={handleSearchFieldChange}
      />
    </>
  )
}