import React from "react";
import { Flex, Spacer, Center, Text, Square, Box } from '@chakra-ui/react'
import TmdbApi from "../modules/TmdbApi";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack } from "@chakra-ui/react";
import { Heading, Button } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'


function Movie({ movieId }) {
    const [movie, setMovie ] = React.useState({})
    const {id} = useParams();

    const getData = () => {
       TmdbApi.getMovieDetails({ movieId:  parseInt(id) }).then( (result) => setMovie(result)
    
       );
    };
    getData();

    return (
      <>    
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        m="30px"
        borderRadius="10px"
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
          alt={movie.title}
        />

        <Stack>
          <CardBody>
          <Heading as='h2' size='xl' paddingBottom="10px">{movie.title}</Heading>
          <Heading as='h4' size='md'>Titre original : "{movie.original_title}"</Heading>
            <Text py='2' mt="5">
            <Heading as='h3' size='md' paddingBottom="10px">Description :</Heading>
            <p>{movie.overview}</p>
            </Text>
            <Flex>
              <Stat mt="3">
                <StatLabel>Moyenne des votes</StatLabel>
                <StatNumber>{(movie.vote_average * 10).toFixed(2)}%</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                  Sur {movie.vote_count} votants
                </StatHelpText>
              </Stat>
              <Stat mt="3">
                <StatLabel>Popularité</StatLabel>
                <StatNumber>{movie.popularity }</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                  Sur {movie.vote_count} votants
                </StatHelpText>
              </Stat>
              <Stat mt="3">
                <StatLabel>Date de sortie</StatLabel>
                <StatNumber>{movie.release_date}</StatNumber>
              </Stat>
            </Flex>
          </CardBody>
        </Stack>
      </Card>
        </>
    );
}

export default Movie;
