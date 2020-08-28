import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Register } from '../entity/Register';
import { validate } from 'class-validator';

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(Register);
    let registers;

    try {
      registers = await userRepository.find({ select: ['id', 'tid', 'name', 'email'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (registers.length > 0) {
      res.send(registers);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  // static getById = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const userRepository = getRepository(Users);
  //   try {
  //     const user = await userRepository.findOneOrFail(id);
  //     res.send(user);
  //   } catch (e) {
  //     res.status(404).json({ message: 'Not result' });
  //   }
  // };

  static new = async (req: Request, res: Response) => {
    const { id, tid, name, email } = req.body;
    const register = new Register();

    register.id = id;
    register.tid = tid;
    register.name = name;
    register.email = email;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(register, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const citiesRepository = getRepository(Register);
    try {
      await citiesRepository.save(register);
    } catch (e) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // All ok
    res.send({ result: 'Usuario creado' });
  };

  // static edit = async (req: Request, res: Response) => {
  //   let user;
  //   const { id } = req.params;
  //   const { username, role } = req.body;

  //   const userRepository = getRepository(Users);
  //   // Try get user
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //     user.username = username;
  //     user.role = role;
  //   } catch (e) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }
  //   const validationOpt = { validationError: { target: false, value: false } };
  //   const errors = await validate(user, validationOpt);

  //   if (errors.length > 0) {
  //     return res.status(400).json(errors);
  //   }

  //   // Try to save user
  //   try {
  //     await userRepository.save(user);
  //   } catch (e) {
  //     return res.status(409).json({ message: 'Username already in use' });
  //   }

  //   res.status(201).json({ message: 'User update' });
  // };

  // static delete = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const userRepository = getRepository(Users);
  //   let user: Users;

  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (e) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   // Remove user
  //   userRepository.delete(id);
  //   res.status(201).json({ message: ' User deleted' });
  // };
}

export default UserController;
