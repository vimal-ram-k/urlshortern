import { QueryError, RowDataPacket } from "mysql2";
import { HttpStatusCode } from "axios";

namespace route_types {
  export type urlFuncType = {
    generateUUID: () => number;
  };
}

namespace DB {
  export type DBquery = RowDataPacket & {
    id: number;
    longurl: string;
    shorturl: string;
  };
  export type Queries = {
    checkLongURL: string;
    addLongURL: string;
    findlongurl: string;
  };
}
