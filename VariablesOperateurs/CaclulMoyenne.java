package VariablesOperateurs;
import java.util.Scanner;

// Moyenne de 3 notes 
public class CaclulMoyenne {

    public static void main(String[] args) {
        Double Somme, Moyenne;
        // Creation d'objet scanner 
        Scanner scanner = new Scanner(System.in);

        // Note d'un etudiant 
        System.out.println("Enter la pemiere note : ");
        double note1 = scanner.nextDouble();

        System.out.println("Enter la deuxieme note : ");
        double note2 = scanner.nextDouble();

        System.out.println("Enter la troisieme note : ");
        double note3 = scanner.nextDouble();

        Somme = note1 + note2 + note3;
        Moyenne = Somme / 3;

        System.out.println("Moyenne de trois note saisie : " + Moyenne );
    }
}