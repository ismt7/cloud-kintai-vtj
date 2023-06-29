import { DataGrid } from "@mui/x-data-grid";

import GetColumns from "./Column";

export default function AttendanceDailyList() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={[]}
        columns={GetColumns()}
        slots={{
          noRowsOverlay: () => <div>データがありません</div>,
          footer: () => null,
        }}
      />
    </div>
  );
}
