import { useEffect, useState } from 'react';

import { Genre } from '../models/Genre';
import { api } from '../services/api';
import { Button } from '../components/Button';

interface SidebarProps {
  onSelectGenre: (genreId: number) => void;
}

export function SideBar({ onSelectGenre }: SidebarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);  
  const [genres, setGenres] = useState<Genre[]>([]);
  
  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
      handleSelectedGenre(response.data[0].id)
    });
  }, []);

  function handleSelectedGenre(selectedGenreId: number) {
    setSelectedGenreId(selectedGenreId);
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