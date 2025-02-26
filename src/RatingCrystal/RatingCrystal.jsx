import './RatingCrystal.css'

const RatingCrystal = ({ nameRating, number }) => {
  const getRating = (el) => { number(el) }

  return (
    <label className='flex label rating'>
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 1`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 2`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 3`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 4`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 5`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 6`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 7`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 8`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 9`} onClick={(e) => getRating(e.target.value)} />
      <input className='input rating__stone' type='radio' name={nameRating} value={`${nameRating} 10`} onClick={(e) => getRating(e.target.value)} />
    </label>
  )
}

export default RatingCrystal
