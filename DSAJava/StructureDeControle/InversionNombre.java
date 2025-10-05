package DSAJava.StructureDeControle;
import java.util.Scanner;

public class InversionNombre {
    public static void main(String[] args) {
        String chaineNombreInverse = "";
        int dernierChiffre;

        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez un nombre entier :");
        int nombre = scanner.nextInt();

        do {
            dernierChiffre = nombre % 10;
            nombre = (nombre - dernierChiffre)/10;

            chaineNombreInverse = chaineNombreInverse + String.valueOf(dernierChiffre);

        } while (nombre > 0);

        System.out.println(chaineNombreInverse);
        scanner.close();
    }
}
