import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PlusGray from "assets/svgs/Plus-gray.svg";

const FileUploaderList = ({
  files,
  handleAddFileToList,
  handleRemoveFromList,
}) => {
  return (
    <Grid container justifyContent={"center"}>
      {files.map((item, index) => (
        <UploadedFileThumbnail
          file={item}
          key={index}
          index={index}
          handleRemoveFromList={handleRemoveFromList}
        />
      ))}
      <FileUploader handleAddFile={handleAddFileToList} />
    </Grid>
  );
};

const FileUploader = ({ handleAddFile }) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        border: "1px dashed lightGray",
        borderRadius: "10px",
        width: "90px",
        height: "90px",
        position: "relative",
        cursor: "pointer",
        m: 1,
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <input
        type="file"
        onChange={handleAddFile}
        style={{
          width: "100%",
          height: "100%",
          opacity: "0",
          zIndex: "10",
          cursor: "pointer",
        }}
        multiple
        accept="image/png, image/gif, image/jpeg, video/mp4, video/x-m4v, video/*"
      />
      <Grid
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={PlusGray.src} style={{ width: "30px", height: "30px" }} />
      </Grid>
    </Grid>
  );
};

const UploadedFileThumbnail = ({ file, index, handleRemoveFromList }) => {
  var url = URL.createObjectURL(file);
  const isImage = file.type.split("/")[0] === "image";

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        border: "1px dashed lightGray",
        borderRadius: "10px",
        width: "90px",
        height: "90px",
        position: "relative",
        m: 1,
        overflow: "hidden",
      }}
    >
      {isImage ? (
        <img
          width={"100%"}
          height={"100%"}
          style={{ objectFit: "contain" }}
          src={url}
          alt="name123"
        />
      ) : (
        <video src={url} width={"100%"} height={"100%"} />
      )}
      <IconButton
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          color: "gray",
          p: "3px!important",
        }}
        onClick={() => handleRemoveFromList(index)}
      >
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default FileUploaderList;
