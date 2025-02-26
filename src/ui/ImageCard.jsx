import { Img1, Img2, Img3, Img4, Img5, Img6 } from '../assets/mySVG'

const listImg = [Img1, Img2, Img3, Img4, Img5, Img6]

const ImageCard = ({ inventory, classImg = '' }) => {
  const getImg = (img) => {
    return img === '' ? listImg[Math.floor(Math.random() * listImg.length)] : img
  }

  return (<img className={`img ${classImg}`} src={getImg(inventory.img)} alt={inventory.name} />)
}

export default ImageCard
