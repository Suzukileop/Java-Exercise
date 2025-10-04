package DSAJava.StructureDeControle;
import java.util.Scanner;

public class SommeChiffres {
    public static void main(String[] args) {
        int SommeChiffres = 0;
        int dernierChiffre;
        int valeurActuelle;

        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez un nombre :");
        int nombre = scanner.nextInt();
        
        valeurActuelle = nombre;

        while (valeurActuelle > 0) {
            dernierChiffre = valeurActuelle % 10;   
            SommeChiffres += dernierChiffre;
            valeurActuelle = (valeurActuelle - dernierChiffre) / 10;

        }
            
        
        System.out.println("la somme des chiffres de nombre " + nombre + " = " + SommeChiffres);
        scanner.close();
    }    
}
