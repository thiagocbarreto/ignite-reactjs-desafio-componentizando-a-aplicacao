import { useEffect, useState } from 'react';

import { Genre } from '../models/Genre';
import { api } from '../services/api';
import { Button } from '../components/Button';

import '../styles/sidebar.scss';

interface SidebarProps {
  selectedGenreId: number | undefined;
  onSelectGenre: (genreId: number) => void;
}

export function SideBar({ onSelectGenre, selectedGenreId }: SidebarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  
  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
      handleSelectedGenre(response.data[0].id)
    });
  }, []);

  function handleSelectedGenre(selectedGenreId: number) {
    onSelectGenre(selectedGenreId);
  }
  
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}