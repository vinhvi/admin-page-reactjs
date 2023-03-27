import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Typography, useTheme } from "@mui/material";
import { mockDataProduct } from "../../data/mockDataProduct";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";

const ManageProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name Product",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "type", headerName: "Type" },
    {
      field: "producer",
      headerName: "Producer",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
    },
    {
      field: "count",
      headerName: "Count",
      flex: 1,
    },

    {
      field: "importPrice",
      headerName: "Import Price",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "shelves",
      headerName: "Shelves",
      flex: 1,
      renderCell: ({ row: { shelves } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              shelves === 1
                ? colors.greenAccent[600]
                : shelves === 0
                ? colors.redAccent[600]
                : colors.blueAccent[100]
            }
            borderRadius="4px"
          >
            {shelves === 1 && <ShoppingCartIcon />}
            {shelves === 0 && <RemoveShoppingCartIcon />}
          </Box>
        );
      },
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            display="flex"
            width="60%"
            ml="0 auto"
            p="5px"
            justifyContent="center"
            backgroundColor={colors.primary[200]}
            borderRadius="4px"
          >
            <EditIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Edit
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Manage Product" subtitle="List of Product in Store" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
        checkboxSelection
          rows={mockDataProduct}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ManageProduct;
