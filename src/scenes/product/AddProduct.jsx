import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import { getSupplierByid } from "../../api/ApiSupplier";
import { config } from "@fullcalendar/core/internal";
import { useDropzone } from "react-dropzone";
import "./style.css";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    type: "",
    producer: "",
    supplier: "",
    count: "",
  });

  const [imageProduct, setImageProduct] = useState("");
  const [id, setId] = useState("");
  const [namProduct, setNameProduct] = useState("");
  const [type, setType] = useState("");
  const [producer, setProducer] = useState("");
  const [idSupplier, setIdSupplier] = useState("");
  const [nameNCC, setNameNCC] = useState("");
  const [sdtNCC, setSdtNCC] = useState("");
  const [emailNCC, setEmailNCC] = useState("");
  const [count, setCount] = useState("");
  const [address, setAddress] = useState("");
  const [exchange, setExchange] = useState("");

  //hàm set image lên ui
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageProduct(reader.result);
    };
  };

  //hàm check nhà cung cấp trong database
  const checkNCC = async () => {
    try {
      const { data } = await axios.get(getSupplierByid, config);
      if (data) {
        setIdSupplier(data.id);
        setAddress(data.address);
        setNameNCC(data.name);
        setSdtNCC(data.phone);
      }
      console.log("supplier is null");
    } catch (error) {
      console.log("Lỗi khi checkNCC: " + error);
    }
  };

  // hàm thêm ảnh vào table
  const [arrayImage, setArrayImage] = useState([]);
  const addImage = () => {
    setArrayImage([
      ...arrayImage,
      { id: arrayImage.length + 1, name: imageProduct },
    ]);
  };

  // hàm xóa ảnh ra khỏi table
  const deleteImage = (itemId) => {
    if (arrayImage.length > 0) {
      // check if array is not empty
      const newArray = [...arrayImage]; // create a copy of the original array
      newArray.pop(); // remove the last element from the new array
      if (newArray.length === 0) {
        // check if the new array is empty
        setArrayImage([]); // set the state to a new array with a default value
      } else {
        setArrayImage(newArray); // update the state with the new array
      }
    }
  };

  //khởi tạo để lấy đường link image rồi set lên
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // hàm thêm thông số KT vào table
  const [arrayTSKT, setArrayTSKT] = useState([]);

  const addTSKT = () => {
    setArrayTSKT([
      ...arrayTSKT,
      {
        id: arrayTSKT.length,
        count: arrayTSKT.length + 1,
        name1: `Item ` + arrayTSKT.length,
        name2: `Item ` + arrayTSKT.length,
      },
    ]);
  };

  // hàm xóa thông số KT ra khỏi table
  const deleteTSKT = (itemId) => {
    if (arrayTSKT.length > 0) {
      // check if array is not empty
      const newArray = [...arrayTSKT]; // create a copy of the original array
      newArray.pop(); // remove the last element from the new array
      if (newArray.length === 0) {
        // check if the new array is empty
        setArrayTSKT([]); // set the state to a new array with a default value
      } else {
        setArrayTSKT(newArray); // update the state with the new array
      }
    }
  };

  //hàm set thông số vào texfeild
  const [valueTSKT, setValueTSKT] = useState(null);
  const [idTSKT, setIdTSKT] = useState("");
  const [tenTS, setTenTS] = useState("");
  const [chiTietTS, setChiTietTS] = useState("");

  const handleTableTSKTRowClick = (item) => {
    setValueTSKT(item);
    setIdTSKT(item.id);
    setTenTS(item.name1);
    setChiTietTS(item.name2);
  };

  const updateTSKT = () => {
    const newArray = [...arrayTSKT];
    newArray[idTSKT] = {
      id: idTSKT,
      count: idTSKT + 1,
      name1: tenTS,
      name2: chiTietTS,
    };
    setArrayTSKT(newArray);
  };

  return (
    <Box m="20px">
      <Header title="Add new Product" subtitle="add new product" />
      <Button
        style={{
          color: "white",
          border: "1px solid green",
          backgroundColor: "red",
          marginLeft: 10,
        }}
      >
        Thêm Sản Phẩm Vào Kho Hàng
      </Button>
      <Box display={"flex"}>
        <Box>
          <div style={{ marginTop: 10, width: 700 }}>
            <TextField
              style={{ marginLeft: 10 }}
              placeholder="Tên sản phẩm"
              type={"text"}
              onChange={(e) => setNameProduct(e.target.value)}
            />
            <TextField
              style={{ marginLeft: 10, width: 185 }}
              placeholder="Ngày nhập"
              type={"date"}
            />
            <TextField
              style={{ marginLeft: 10 }}
              placeholder="Loại"
              type={"text"}
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              style={{ marginLeft: 10, marginTop: 10 }}
              placeholder="Nhà sản xuất"
              type={"text"}
              onChange={(e) => setProducer(e.target.value)}
            />
            <TextField
              style={{ marginLeft: 10, marginTop: 10 }}
              placeholder="Số lượng"
              type={"number"}
              onChange={(e) => setCount(e.target.value)}
            />
            <TextField
              style={{ marginLeft: 10, marginTop: 10 }}
              placeholder="Đổi trả và bảo hành"
              type={"text"}
              onChange={(e) => setExchange(e.target.value)}
            />
          </div>
        </Box>
        <Box>
          <div style={{ marginTop: 10, width: 500 }}>
            <TextField
              style={{ marginLeft: 10 }}
              placeholder="Tên nhà cung cấp"
              value={nameNCC}
              onChange={(e) => setNameNCC(e.target.value)}
              type={"text"}
            />
            <TextField
              style={{ marginLeft: 10 }}
              placeholder="Số điện thoại "
              value={sdtNCC}
              onChange={(e) => setSdtNCC(e.target.value)}
              type={"text"}
            />
            <TextField
              style={{ marginLeft: 10, width: 80 }}
              type={"submit"}
              value={"Check"}
            />
            <TextField
              style={{ marginLeft: 10, marginTop: 10 }}
              placeholder="Email"
              value={emailNCC}
              onChange={(e) => setEmailNCC(e.target.value)}
              type={"text"}
            />
            <TextField
              style={{ marginLeft: 10, marginTop: 10 }}
              placeholder="Địa chỉ nhà cung cấp"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type={"text"}
            />
            <TextField
              style={{ marginLeft: 10, marginTop: 10, width: 80 }}
              type={"submit"}
              value={"Add"}
            />
          </div>
        </Box>
      </Box>

      <Box m="20px">
        <Header title={"Thêm ảnh cho sản phẩm"} />
        <div
          style={{
            marginTop: 20,
            marginLeft: 10,
            display: "flex",
            height: 450,
          }}
        >
          <div>
            <div
              {...getRootProps()}
              style={{
                width: 400,
                height: 400,
                border: "1px solid white",
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              <input {...getInputProps()} />
              {imageProduct ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={imageProduct} alt="Uploaded image" />
              ) : (
                <AddToPhotosIcon
                  style={{ marginTop: 150, marginLeft: 170 }}
                  fontSize="large"
                />
              )}
            </div>
            <div
              style={{
                alignItems: "center",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <Button
                style={{
                  color: "white",
                  border: "1px solid green",
                  backgroundColor: "green",
                }}
                onClick={addImage}
              >
                Thêm
              </Button>
            </div>
          </div>

          <div
            style={{
              marginTop: 100,
              marginLeft: 100,
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Link</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {arrayImage.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Button
                        onClick={() => deleteImage(item.id)}
                        style={{ backgroundColor: "red" }}
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>

      <Box m="20px">
        <Header title={"Thêm thông số kỹ thuật"} />
        <div>
          <TextField
            placeholder="Tên thông số"
            type={"text"}
            value={tenTS}
            onChange={(e) => setTenTS(e.target.value)}
          />
          <TextField
            placeholder="Chi tiết thông số"
            type={"text"}
            style={{ marginLeft: 20 }}
            value={chiTietTS}
            onChange={(e) => setChiTietTS(e.target.value)}
          />
          <TextField
            value={"Thêm"}
            type={"submit"}
            style={{ marginLeft: 20, backgroundColor: "green" }}
            onClick={addTSKT}
          />
          <TextField
            value={"Sửa"}
            type={"submit"}
            style={{ marginLeft: 20, backgroundColor: "green" }}
            onClick={updateTSKT}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên thông số</th>
                <th>Chi tiết</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrayTSKT.map((item) => (
                <tr key={item.id} onClick={() => handleTableTSKTRowClick(item)}>
                  <td>{item.count}</td>
                  <td>{item.name1}</td>
                  <td>{item.name2}</td>
                  <td>
                    <Button
                      onClick={() => deleteTSKT(item.id)}
                      style={{ backgroundColor: "red" }}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>

      <Box m="20px">
        <Header title={"Giá sản phẩm"} />

        <div>
          <TextField label="Tên thông số" type={"text"} />
          <TextField
            label="Giá nhập"
            type={"text"}
            style={{ marginLeft: 20 }}
          />
          <TextField label="Giá bán" type={"text"} style={{ marginLeft: 20 }} />
          <TextField
            value={"Thêm"}
            type={"submit"}
            style={{ marginLeft: 20 }}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên thông số</th>
                <th>Giá nhập</th>
                <th>Giá bán</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> Column 1</td>
                <td> Column 2</td>
                <td> Column 3</td>
                <td> Column 4</td>
              </tr>
              <tr>
                <td> Column 1</td>
                <td> Column 2</td>
                <td> Column 3</td>
                <td> Column 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>

      <Box m="20px">
        <Header title={"Thêm mô tả"} />
        <div>
          <TextField label="Tên mô tả" type={"text"} />
          <TextField
            label="Nhập mô tả cho sản phẩm ( `/n` để xuống dòng)"
            multiline
            style={{ width: 500, marginLeft: 20 }}
            type={"text"}
          />
          <p style={{ marginLeft: 500 }}>QTVSMART.ME</p>
        </div>
      </Box>
    </Box>
  );
};

export default AddProduct;
