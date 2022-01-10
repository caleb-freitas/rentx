interface IRequest {
  id: string;
  user_id: string;
}

class RentalReturnUseCase {
  async execute({ id, user_id }: IRequest) {}
}

export { RentalReturnUseCase };
