import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const HomePage = () => {
  return (
    <Card sx={{ maxWidth: 345, mt: 8 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/278645786_2093461604152453_2308540442379987915_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=mRxNCkZR-noAX_cN3PK&_nc_ht=scontent.fhan19-1.fna&oh=00_AfDgFKnmio_sA5RUpyC_-1MG0o-xe2apHF9-rzDcTquG5Q&oe=6410CBE2"
          alt="pham can"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pham Can
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: phamcan93@gmail.com
            <br />
            User: dung+octopus4@101digital.io
            <br />
            Password: Abc@123456
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
