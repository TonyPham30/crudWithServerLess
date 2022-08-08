import {dynamoDBClient} from "../models/index";
import TodoService from "./todo"

const todoService = new TodoService(dynamoDBClient());
export default todoService;