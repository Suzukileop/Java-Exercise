package DSAJava.StructureDeControle;
import java.util.Scanner;

public class NombrePremier {
    public static void main(String[] args) {
        boolean premier = true;

        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrer un nombre : ");
        int nombrePremier = scanner.nextInt();

        if (nombrePremier == 1) { System.out.println("Le nombre 1 n'est pas premier."); System.exit(0);}
        if (nombrePremier == 2 ){ System.out.println("Le nombre 2 est un nombre premier"); System.exit(0);}

        for (int i = 2; i <= (Math.sqrt(nombrePremier)); i++) {
            if ((nombrePremier % i) == 0) {
                premier = false;
                break;
            } 
        }

        if (premier == true) {
            System.out.println("Le nombre " + nombrePremier + " est un nombre premier.");
        } else {
            System.out.println("Le nombre " + nombrePremier + " n'est pas premier.");
        }

        scanner.close();
    }
}
