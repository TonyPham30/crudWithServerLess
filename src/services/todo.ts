import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "src/configs/interfaces/todo";

export default class TodoService {
    private TableName: string = "TodosTable";
    constructor(private docClient: DocumentClient) {
        
    }
    // get all todos
    async getAllTodos(): Promise<Todo[]> {
        const todos = await this.docClient.scan({
            TableName: this.TableName,
        }).promise()
        return todos.Items as Todo[];
    }
    // create a new todo
    async createTodo(todo: Todo): Promise<Todo> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: todo
        }).promise()
        return todo as Todo;
    }

    // get a todo
    async getTodo(id: string): Promise<any> {

        const todo = await this.docClient.get({
            TableName: this.TableName,
            Key: {
                todosId: id
            }
        }).promise()
        if (!todo.Item) {
            throw new Error("Id does not exit");
        }
        return todo.Item as Todo;

    }

    // update todo with :id
    async updateTodo(id: string): Promise<Todo> {
        const updated = await this.docClient
            .update({
                TableName: this.TableName,
                Key: { todosId: id },
                UpdateExpression:
                    "set #status = :status",
                ExpressionAttributeNames: {
                    "#status": "status",
                },
                ExpressionAttributeValues: {
                    ":status": true,
                },
                ReturnValues: "ALL_NEW",
            })
            .promise();
        return updated.Attributes as Todo;
    }

    // delete todo
    async deleteTodo(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.TableName,
            Key: {
                todosId: id
            }
        }).promise();
    }
}