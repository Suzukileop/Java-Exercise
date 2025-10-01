
import java.util.Scanner;;

// Determination si un nombre est par et impair
public class NombrePairImpair {

    public static void main(String[] args) {
        // Creation d'objet scanner 
        Scanner scanner = new Scanner(System.in);

        // Saisie d'un nombre 
        System.out.println("Entrez un nombre : ");
        int nombre = scanner.nextInt();

        int reste = nombre % 2;

        if ( reste == 0 ) {
            System.out.println(nombre + " est un nombre pair.");
        }else{
            System.out.println(nombre + " est un nombre impair.");
        }

        scanner.close();
    }
    
}
