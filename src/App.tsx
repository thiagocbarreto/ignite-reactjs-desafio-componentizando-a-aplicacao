import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);  
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onSelectGenre={setSelectedGenreId} selectedGenreId={selectedGenreId} />
      <Content selectedGenreId={selectedGenreId} />
    </div>
  )
}