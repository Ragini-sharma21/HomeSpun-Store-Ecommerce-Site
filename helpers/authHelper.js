import  bcrypt from 'bcrypt'


//function to covert normal password to hash
export const hashPassword =async(password)=>{
    try{
        const saltRounds=10;   //no of rounds for decryption
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.log(error)
    }
    };

    //function for compare normal and hashed password

    export const comparePassword = async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
      };


