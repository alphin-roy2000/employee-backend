import { NextFunction, Response } from "express";
import multer from "multer";
import APP_CONSTANTS from "../constants";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import authorize from "../middleware/authorize";
import authorizeadmin from "../middleware/authorize admin";
import validationMiddleware from "../middleware/validationMiddleware";
import { AddressService } from "../services/AddressService";
import { EmployeeService } from "../services/EmployeeService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
/**
 * Implementation of the EmployeeController route.
 *
 */
class EmployeeController extends AbstractController {

  private upload = multer({ dest: "./public/uploads/"});
  constructor(
    private employeeService: EmployeeService,
    private addressService: AddressService,
  ) {
    super(`${APP_CONSTANTS.apiPrefix}/employees`);
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.get(
      `${this.path}`,
      // authorize(),
      this.asyncRouteHandler(this.getAllEmployees)
    );
    this.router.get(
      `${this.path}/:employeeId`,
      this.asyncRouteHandler(this.getEmployeeById)
    );
    this.router.post(
      `${this.path}`,
      authorizeadmin("admin"),
      // authorizeadmin(),
      // validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
      this.createEmployee
    );
    this.router.put(
      `${this.path}/:employeeId`,
      authorizeadmin("admin"),

      this.asyncRouteHandler(this.updateEmployee)
    );
    this.router.delete(
      `${this.path}/:employeeId`,
      authorizeadmin("admin"),
      this.asyncRouteHandler(this.deleteEmployee)
    );

    this.router.post(
      `${this.path}/upload`,
      this.upload.single("file"),
      this.asyncRouteHandler(this.uploadImage)
    );
    this.router.post(
      `${this.path}/login`,
      this.asyncRouteHandler(this.login)
    )
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.employeeLogin(request.body.username,request.body.password);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private getAllEmployees = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    // console.log(request.params.employeeId)
    // const data = await this.employeeService.getEmployeeById(request.params.employeeId);
    // const saveadd = await this.addressService.getAddressById(data.addressId);
    // let employee = {
    //   data:data,
    //   savedate:saveadd
    // };
    const employee = await this.employeeService.getAllEmployees();
    response.send(
      this.fmt.formatResponse(employee, Date.now() - request.startTime, "OK")
    );
  }

  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.employeeService.getEmployeeByIdWithAddress(request.params.employeeId);
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const add = await this.addressService.createAddress(request.body);
      request.body["address_id"] = add.id;
      console.log(request.body)
      const data = await this.employeeService.createEmployee(request.body);

      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
      const data = await this.employeeService.updateEmployee(request.params.employeeId, request.body);
      response.status(201).send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
  }

  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
      const data = await this.employeeService.deleteEmployee(request.params.employeeId);
      response.status(201).send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
  }

  private uploadImage = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const filePath = `${APP_CONSTANTS.basePath}/${request.file.path.slice(7)}`;
    response.send(
      this.fmt.formatResponse(
        { filePath },
        Date.now() - request.startTime,
        "OK"
      )
    );
  }

}

export default EmployeeController;
