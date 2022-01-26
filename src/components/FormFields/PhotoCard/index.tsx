import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DefaultImageIcon from "../../../icons/DefaultImageIcon";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from '@mui/system';
import { IconButton } from "@mui/material";
import CloseIcon from "../../../icons/CloseIcon";

export type ImageCardType = {
  name: string,
  url?: string,
  size?: number,
  progress?: number
}

interface PhotoCardProps {
  image: ImageCardType,
  onClose: (url: string) => void
}

const Progress = styled(LinearProgress)({
  width: '245px',
  height: '5px',
  backgroundColor: '#F0F2F5',
  borderRadius: '10px',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#535E6C',
    borderRadius: '10px',
  },
})



const PhotoCard: React.FC<PhotoCardProps> = ({
  image: {
    name,
    url,
    size,
    progress,
  },
  onClose }) => {

  const handleCloseCard = () => {
    onClose(url || '')
  }

  return <>
    <Box
      sx={{
        width: '340px',
        minHeight: '70px',
        border: '1px solid #E3E3EA',
        borderRadius: '5px',
        p: '10px',
        position: 'relative'
      }}
    >
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={2}
      >
        <Box>
          {(progress || !url) ? <Box
            sx={{
              p: '7px',
              borderRadius: '5px',
              backgroundColor: '#FBFBFB',
              width: '50px',
              height: '50px',
            }}

          >
            <DefaultImageIcon />
          </Box> : (

            <img style={{
              width: '50px',
              height: '50px',
              borderRadius: '5px',
              objectFit: 'cover',
            }} src={url} alt={name} />
          )}
        </Box>
        <Stack
          direction='column'
          justifyContent='space-between'
        >
          <Typography
            variant="body1"
            fontFamily='Nunito'
            fontSize='14px'
            color='#535E6C'
            width='200px'
            mb={1}
            sx={{
              wordWrap: 'break-word'
            }}
          >
            {name}
          </Typography>
          {(progress && !size) && <Progress variant="determinate" value={progress} />}
          {size && (
            <Typography
              variant="body1"
              fontFamily='Nunito'
              fontSize='14px'
              color='#D0D4DA'
              mb={1}
            >
              {size < 100000 ? `${(size / 1024).toFixed(2)} Kb` : `${(size / 1024 / 1024).toFixed(2)} Mb`}
            </Typography>
          )}
        </Stack>
      </Stack>
      <IconButton
        sx={{
          position: 'absolute',
          m: '10px',
          top: '0',
          right: '0',
          p: '5px'
        }}
        onClick={handleCloseCard}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </>
}

export default PhotoCard