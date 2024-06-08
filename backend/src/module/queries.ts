import { DB } from "../types/route_type";

const DBqueries: DB.Queries = {
  checkLongURL: `select * from urltable where longurl = ?`,
  addLongURL: `insert into urltable (id , longurl , shorturl) values (? , ? , ?)`,
  findlongurl: `select longurl from urltable where shorturl = ?`,
};

export default DBqueries;
