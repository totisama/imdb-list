import { BackButton } from '@/components/BackButton'
import { ToggleMovie } from '@/components/ToggleMovie'
import { useMovies } from '@/hooks/useMovies'
import Image from 'next/image'

interface MoviePageProps {
  params: {
    movieName: string
  }
}

export default async function MoviePage ({ params }: MoviePageProps) {
  const { movieName } = params
  const unformattedMovieName = decodeURIComponent(movieName).replace(/-/g, ' ')
  const { movies } = await useMovies({ name: unformattedMovieName })

  if (movies.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center gap-5 w-full min-h-dvh text-center'>
        <h1 className='text-4xl'>{unformattedMovieName} {' '} Movie not found :(</h1>
        <BackButton />
      </div>
    )
  }

  const movie = movies[0]
  const ratingColor = movie.rating >= 8 ? 'text-green-500' : movie.rating >= 6 ? 'text-yellow-500' : 'text-red-500'

  return (
    <div className='py-10 px-10 lg:py-12 lg:px-24'>
      <BackButton />
      <main className='flex flex-col mt-5 gap-10 items-center lg:flex-row lg:items-start lg:justify-center lg:gap-24'>
        <div className='h-96 flex justify-end lg:w-1/2 lg:h-full '>
          <Image className='object-contain' width={500} height={500} src={movie.image_url} alt={`${movie.name} image`} />
        </div>
        <div className='lg:w-1/2 lg:mt-16'>
          <h1 className='text-center lg:text-start text-6xl'>{movie.name}</h1>
          <div className='space-y-3 mt-10 mb-5'>
            <h2 className='text-2xl font-bold'>Actors: {' '}
              <span className='text-lg text-gray-400 font-semibold'>{movie.actors.join(', ')}</span>
            </h2>
            <h2 className='text-2xl font-bold'>Directors: {' '}
              <span className='text-lg text-gray-400 font-semibold'>{movie.directors.join(', ')}</span>
            </h2>
            <h2 className='text-2xl font-bold'>Genres: {' '}
              <span className='text-lg text-gray-400 font-semibold'>{movie.genre.join(', ')}</span>
            </h2>
            <div className='w-full flex justify-center gap-10'>
              <h2 className='text-2xl font-bold'>Year: {' '}
                <span className='text-white font-semibold'>{movie.year}</span>
              </h2>
              <h2 className='text-2xl font-bold'>Rating: {' '}
                <span className={`${ratingColor} font-semibold`}>{movie.rating}</span>
              </h2>
            </div>
          </div>
          <ToggleMovie movieName={movieName} />
          <p className='text-lg'>{movie.desc}</p>
        </div>
      </main>
    </div>
  )
}
