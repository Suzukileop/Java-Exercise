package DSAJava.StructureDeControle;
import java.util.Scanner; 

public class Fibonacci {
    public static void main(String[] args) {
        Integer ValeurPrecedente = null , valeurActuelle = null;

        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez un nombre entier : ");
        int nombre = scanner.nextInt();

        System.out.println("\nVoici une suite de Fibonacci ne " + nombre + "premier(s) nombre(s) :");

        for (int i = 0; i < nombre; i++) {
            int temp;

            if ((ValeurPrecedente == null) && (valeurActuelle == null)) {
                ValeurPrecedente = 0;
                System.out.println(ValeurPrecedente);

            } else if ((ValeurPrecedente == 0) && (valeurActuelle == null)) {
                valeurActuelle = 1;
                System.out.println(valeurActuelle);

            } else {
                temp = valeurActuelle + ValeurPrecedente;
                ValeurPrecedente = valeurActuelle;
                valeurActuelle = temp;
                System.out.println(valeurActuelle);
            }
            
        }

        scanner.close();
    }    
}
