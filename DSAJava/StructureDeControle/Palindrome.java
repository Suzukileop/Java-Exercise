package DSAJava.StructureDeControle;
import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args) {
        String chaineNombreInverse = "";
        int dernierChiffre;

        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez un nombre entier :");
        int nombre = scanner.nextInt();
        int temp = nombre;

        do {
            dernierChiffre = nombre % 10;
            nombre = (nombre - dernierChiffre)/10;

            chaineNombreInverse = chaineNombreInverse + String.valueOf(dernierChiffre);

        } while (nombre > 0);

        if (temp == (Integer.parseInt(chaineNombreInverse))) {
            System.out.println("Le nombre " + temp + " est palindrome");
        } else {
            System.out.println("Le nombre " + temp + " n'est pas palindrome.");
        }
        
        scanner.close();
    }
}
