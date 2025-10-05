package DSAJava.StructureDeControle;
import java.util.Scanner;

public class PGCD {
    public static void main(String[] args) {
        int reste;
        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez le premier nombre : ");
        int a = scanner.nextInt();

        System.out.println("Entrez le deuxieme nombre :");
        int b = scanner.nextInt();

        int c = a;
        int d = b;
        // procipe PGCD(a , b) = PGCD(b, a mod b)
        do  {
            if (a > b) {
                reste = a % b;
                a = b;
                b = reste;
            }else {
                reste = b % a;
                a = b;
                b= reste;
            }
        }while(b != 0);

        System.out.println("PGCD( " + c + ", " + d + " ) = " + a);
    
    scanner.close();
    }    
}
