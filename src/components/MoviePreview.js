import React from 'react'
import TmdbApi from "../modules/TmdbApi";
import { Card, CardHeader, CardBody, CardFooter, Image, Box } from "@chakra-ui/react";
import { Heading, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

function MoviePreview({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`}>
          <Box>
            { movie.poster_path? (
            <Image src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt={movie.title} boxSize="100%" objectFit="cover" borderRadius="10px" border="1px solid white" _hover={{ 
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)', 
            transform: 'scale(.95)' 
          }}
          transition="all 0.3s ease" />):(<Box border="1px solid white" minHeight="300px" borderRadius="10px" textAlign="center" paddingTop="30px" backgroundColor="#E4CF87" fontWeight="500" color="#232323" as='h3' size='md'>{movie.title}</Box>)
        }
          </Box>
        
        </Link>
      );
}

export default MoviePreview
