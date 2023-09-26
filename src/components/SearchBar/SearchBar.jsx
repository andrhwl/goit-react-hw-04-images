import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarContainer,
} from './SearchBar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSaveSearch = evt => {
    setSearchValue(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Oopps, enter at least something');
      return;
    }

    onSubmit(searchValue);
    reset();
  };

  const reset = () => {
    setSearchValue('');
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <ImSearch />
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleSaveSearch}
        />
      </SearchForm>
    </SearchbarContainer>
  );
}
