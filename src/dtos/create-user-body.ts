import { IsNotEmpty, Length } from "class-validator";

// o class validator é possível ser feito pelo prisma, qual a diferença ? imagino que seja não enviar os dados não verificados diretamente no banco, para no controller antes de ir para o db

export class createMemberBody {
    @IsNotEmpty({           
        message: 'Name cannot be empty'
    })
    @Length(5, 100)
    name: string;

    @IsNotEmpty()
    email: string;
}