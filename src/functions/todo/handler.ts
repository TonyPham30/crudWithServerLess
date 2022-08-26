import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import todoService from "../../services"
import {Request} from "express"

// function get all todo
export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const todos = await todoService.getAllTodos();
    return formatJSONResponse({
        todos
    })
})

// function create a new todo
// middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>
export const createTodo = async (req: Request) => {
    try {
        const id = v4();
        const body = JSON.parse(req.body)
        const todo = await todoService.createTodo({
            todosId: id,
            title: body.title,
            description: body.description,
            createdAt: new Date().toISOString(),
            status: false
        })
        return formatJSONResponse({
            todo
        })
    } catch (error) {
        return formatJSONResponse({
            status: 500,
            message: error
        });
    }
}

// get a todo
export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todoService.getTodo(id)
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

// update todo
export const updateTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todoService.updateTodo(id)
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

// delete todo
export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todoService.deleteTodo(id)
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const helloHandler = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const message = "helloHandler"
    return formatJSONResponse({
        message
    });
});